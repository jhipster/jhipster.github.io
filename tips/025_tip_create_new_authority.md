---
layout: default
title: How to create a new Authority
sitemap:
priority: 0.1
lastmod: 2018-10-05T18:20:00-00:00
---
# How to create a new Authority

__Tip submitted by [@Tonterias](https://github.com/Tonterias)__

Let's say that you need a new authority besides the given ones of ADMIN and USER.

Modify AuthoritiesConstants.java file to include your new authorities:

	/**
	 * Constants for Spring Security authorities.
	 */
	public final class AuthoritiesConstants {
	
	    public static final String ADMIN = "ROLE_ADMIN";
	
	    public static final String USER = "ROLE_USER";
	
	    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
	
	    private AuthoritiesConstants() {
	    }
	}

Do not forget to include your new role in your authorities.csv:

	name
	ROLE_ADMIN
	ROLE_USER
	ROLE_ANONYMOUS


With that, you will be able to use it in your SecurityConfiguration.java or in (FrontpageconfigResource.java), for example:
	
	@DeleteMapping("/order-items/{id}")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteOrderItem(@PathVariable Long id) {
	    ...
	}

and/or Angular files: jhiHasAnyAuthority=[‘ROLE_ADMIN’. ‘ROLE_X’ ……] or even consider to use it in the routes:

	export const messageRoute: Routes = [
	    {
	        path: 'message',
	        component: MessageComponent,
	        data: {
	            authorities: ['ROLE_USER'],
	            pageTitle: 'Messages'
	        },
	        canActivate: [UserRouteAccessService]
	    }
	];
	
The open-source example is at JhipsterPress: https://github.com/Tonterias/JhipsterPress
