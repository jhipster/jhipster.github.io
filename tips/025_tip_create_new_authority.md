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

First, modify AuthoritiesConstants.java file to include your new authority:

package es.yourdomain.web.security;

	/**
	 * Constants for Spring Security authorities.
	 */
	public final class AuthoritiesConstants {

	    public static final String ADMIN = "ROLE_ADMIN";

	    public static final String USER = "ROLE_USER";

	    public static final String LOCAL = "ROLE_LOCAL";

	    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

	    private AuthoritiesConstants() {
	    }
	}

Do not forget to include your new role in your authorities.csv:

	name
	ROLE_ADMIN
	ROLE_USER
	ROLE_ANONYMOUS
	ROLE_LOCAL


With that, you will be able to use it in your SecurityConfiguration.java or in (UserResource.java), for example:
	
    /**
     * Gets a list of all roles.
     * @return a string list of all roles.
     */
    @GetMapping("/users/authorities")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

and/or in your Angular files: jhiHasAnyAuthority=[‘ROLE_ADMIN’. ‘ROLE_X’ ……] or even consider to use it in the routes:

export const appuserRoute: Routes = [
  {
    path: '',
    component: AppuserComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER, Authority.LOCAL],
      defaultSort: 'id,asc',
      pageTitle: 'mibarApp.appuser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
	

