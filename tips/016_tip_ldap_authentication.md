---
layout: default
title: LDAP Authentication
sitemap:
priority: 0.5
lastmod: 2019-11-11T22:22:00-00:00
---

# LDAP Authentication

__Tip submitted by [@mleneveut](https://github.com/mleneveut)__ updated by [@patrickjp93](https://github.com/patrickjp93)__

To add an LDAP authentication to your JHipster application, follow these steps :

  * Add the dependencies spring-ldap-core and spring-security-ldap. Example for gradle in build.gradle :

```
    compile group: 'org.springframework.security', name: 'spring-security-ldap', version: spring_security_version
```
  * Modify the SecurityConfiguration.java, add method configureGlobal(AuthenticationManagerBuilder auth) and getContextSource()
  * The following query strings should ideally be [encapsulated in environment variables](https://github.com/eugenp/tutorials/blob/master/spring-ldap/src/main/java/com/baeldung/ldap/javaconfig/AppConfig.java), or at the very least properties/yml files 

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
  * Modify the SecurityUtils.java, method getCurrentUserLogin()

```
    } else if (authentication.getPrincipal() instanceof LdapUserDetails) {
    	LdapUserDetails ldapUser = (LdapUserDetails) authentication.getPrincipal();
    	return ldapUser.getUsername();
    }
```
  * Add a new CustomAuthenticationManager class which implements the AuthenticationManager interface and override the authentication method in order to force the authentication process to authenticate the user through LDAP.

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

  * For some LDAP servers, the below authenticate implementation has been more successful, but requires more effort to map user authenticated users into the Users table and set authorities based on AD Groups
  * Credit to [@eugenp](https://github.com/eugenp/tutorials/tree/master/spring-ldap) and [Michael Kostewicz](http://code-addict.pl/active-directory-spring-security/) for their stable reference implementations
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
