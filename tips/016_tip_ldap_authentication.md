---
layout: default
title: Authentification LDAP
sitemap:
priority: 0.5
lastmod: 2019-11-11T22:22:00-00:00
---

# Authentification LDAP

__Conseil soumis par [@mleneveut](https://github.com/mleneveut)__ mis à jour par [@patrickjp93](https://github.com/patrickjp93)__

Pour ajouter une authentification LDAP à votre application JHipster, suivez ces étapes :

  * Ajoutez les dépendances spring-ldap-core et spring-security-ldap. Exemple pour Gradle dans build.gradle :

```
    compile group: 'org.springframework.security', name: 'spring-security-ldap', version: spring_security_version
```
  * Modifiez SecurityConfiguration.java, ajoutez la méthode configureGlobal(AuthenticationManagerBuilder auth) et getContextSource()
  * Les chaînes de requête suivantes devraient idéalement être [encapsulées dans des variables d'environnement](https://github.com/eugenp/tutorials/blob/master/spring-ldap/src/main/java/com/baeldung/ldap/javaconfig/AppConfig.java), ou au moins dans des fichiers de propriétés/yml

```
    @Inject
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.ldapAuthentication()
        	.userSearchBase("o=myO,ou=myOu") //don't add the base
        	.userSearchFilter("(uid={0})")
        	.groupSearchBase("ou=Groups") //don't add the base
        	.groupSearchFilter("member={0}")
        	.contextSource(getContextSource());
    }
    @Bean
    public LdapContextSource getContextSource() {
    	  LdapContextSource contextSource = new LdapContextSource();
        contextSource.setUrl("ldap://[IP goes here]:[port goes here]");
        contextSource.setBase("dc=mycompany,dc=com");
        contextSource.setUserDn("cn=aUserUid,dc=mycompany,dc=com");
        contextSource.setPassword("hisPassword");
        contextSource.afterPropertiesSet(); //needed otherwise you will have a NullPointerException in spring

        return contextSource;
    }

```
  * Modifiez SecurityUtils.java, méthode getCurrentUserLogin()

```
    } else if (authentication.getPrincipal() instanceof LdapUserDetails) {
    	LdapUserDetails ldapUser = (LdapUserDetails) authentication.getPrincipal();
    	return ldapUser.getUsername();
    }
```
  * Ajoutez une nouvelle classe CustomAuthenticationManager qui implémente l'interface AuthenticationManager et remplacez la méthode d'authentification afin de forcer le processus d'authentification à authentifier l'utilisateur via LDAP.

```

@Component
public class CustomAuthenticationManager implements AuthenticationManager {

    LdapAuthenticationProvider provider = null;

    private static final Logger log = LoggerFactory.getLogger(CustomAuthenticationManager.class);

    private final UserRepository userRepository;

    @Autowired
    private final LdapContextSource ldapContextSource;

    public CustomAuthenticationManager(UserRepository userRepository, LdapContextSource ldapContextSource) {
        this.userRepository = userRepository;
        this.ldapContextSource = ldapContextSource;
    }

    @Override
    public Authentication authenticate(Authentication authentication) {
        log.debug("AUTHENTICATION Login" + authentication.getName());
        log.debug("AUTHENTICATION Password" + authentication.getCredentials().toString());

        BindAuthenticator bindAuth = new BindAuthenticator(ldapContextSource);
        FilterBasedLdapUserSearch userSearch = new FilterBasedLdapUserSearch(
                "", "(uid={0})",
                ldapContextSource);
        try{
            bindAuth.setUserSearch(userSearch);
            bindAuth.afterPropertiesSet();
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(CustomAuthenticationManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        provider = new LdapAuthenticationProvider(bindAuth);
        provider.setUserDetailsContextMapper(new UserDetailsContextMapper() {
            @Override
            public UserDetails mapUserFromContext(DirContextOperations ctx, String username, Collection<? extends GrantedAuthority> clctn) {
                Optional<User> isUser = userRepository.findOneWithAuthoritiesByLogin(username);
                final User user = isUser.get();
                Set<Authority> userAuthorities = user.getAuthorities();
                Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                for(Authority a: userAuthorities){
                    GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(
                            a.getName());
                    grantedAuthorities.add(grantedAuthority);
                }
                  return new org.springframework.security.core.userdetails.User(
                    username, "1" , grantedAuthorities);    
            }

            @Override
            public void mapUserToContext(UserDetails ud, DirContextAdapter dca) {

            }
        });
        return provider.authenticate(authentication);
    }

```

  * Pour certains serveurs LDAP, l'implémentation d'authentification ci-dessous a été plus efficace, mais nécessite plus d'efforts pour mapper les utilisateurs authentifiés dans la table Utilisateurs et définir les autorités en fonction des groupes Active Directory.
  * Un grand merci à [@eugenp](https://github.com/eugenp/tutorials/tree/master/spring-ldap) et [Michael Kostewicz](http://code-addict.pl/active-directory-spring-security/) pour leurs implémentations de référence stables.

```  
  public Authentication authenticate(Authentication authentication) {
        log.info("Authorizing active directory ldap ....");
        
        Hashtable<String, String> ldapEnv = new Hashtable<>(Map.of(
            Context.INITIAL_CONTEXT_FACTORY, this.InitialContextFactory,
            Context.PROVIDER_URL, this.ProviderUrl,
            Context.SECURITY_AUTHENTICATION, this.SecurityAuthentication,
            Context.SECURITY_PRINCIPAL, this.UserDomain + authentication.getPrincipal(),
            Context.SECURITY_CREDENTIALS, authentication.getCredentials().toString(),
            Context.SECURITY_PROTOCOL, "ssl"
        ));

        try {
            ldapContext = new InitialDirContext(ldapEnv);
            authentication.setAuthenticated(true);
            log.info("Connected and authenticated.");
            ldapContext.close();
        } catch (Exception e) { 
            log.error(e.getMessage()); 
        }
        return authentication;
    }
```
