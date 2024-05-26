---
layout: default
title: Comment créer une nouvelle autorité
sitemap:
priority: 0.1
lastmod: 2018-10-05T18:20:00-00:00
---
# Comment créer une nouvelle autorité

__Conseil soumis par [@Tonterias](https://github.com/Tonterias)__

Disons que vous avez besoin d'une nouvelle autorité en plus de celles données ADMIN et USER. Appelons cette nouvelle autorité `ROLE_EXAMPLE_AUTHORITY`.

Modifiez le fichier AuthoritiesConstants.java pour inclure votre nouvelle autorité/autorisations :

	/**
	 * Constants for Spring Security authorities.
	 */
	public final class AuthoritiesConstants {
	
	    public static final String ADMIN = "ROLE_ADMIN";
	
	    public static final String USER = "ROLE_USER";
	
	    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
	    
	    public static final String EXAMPLE_AUTHORITY = "ROLE_EXAMPLE_AUTHORITY";
	
	    private AuthoritiesConstants() {
	    }
	}

N'oubliez pas d'inclure votre nouveau rôle dans votre `authority.csv`:

	name
	ROLE_ADMIN
	ROLE_USER
	ROLE_ANONYMOUS
	ROLE_EXAMPLE_AUTHORITY


Avec cela, vous pourrez l'utiliser dans votre SecurityConfiguration.java :

```
@Override
    public void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
            .csrf()
            .disable()
            ...
        ...
        .and()
            .authorizeRequests()
            ...
            .antMatchers("/newresource/**").hasAuthority(AuthoritiesConstants.ROLE_EXAMPLE_AUTHORITY)
```

Et dans votre couche de contrôleur (par exemple `FrontPageConfigResource.java`):
	
	@DeleteMapping("/order-items/{id}")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_EXAMPLE_AUTHORITY')")
	public ResponseEntity<Void> deleteOrderItem(@PathVariable Long id) {
	    ...
	}

Et dans vos fichiers html Angular :  `jhiHasAnyAuthority=[‘ROLE_ADMIN’, ‘ROLE_EXAMPLE_AUTHORITY’ ...]` 

Et dans vos routes Angular :

	export const messageRoute: Routes = [
	    {
	        path: 'message',
	        component: MessageComponent,
	        data: {
	            authorities: ['ROLE_EXAMPLE_AUTHORITY'],
	            pageTitle: 'Messages'
	        },
	        canActivate: [UserRouteAccessService]
	    }
	];
	
L'exemple open-source est disponible sur JhipsterPress: https://github.com/Tonterias/JhipsterPress
