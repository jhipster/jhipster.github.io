---
layout: default
title: Put userId inside JWT token
sitemap:
priority: 0.5
lastmod: 2016-10-12T22:22:00-00:00
---

# Put _userId_ inside JWT token

**Tip submited by [@flanciskinho](http://github.com/flanciskinho)**

<!--
La razon para poner el userId dentro del token JWT es que se puede coger el identificador del usuario consultando el token y no hacer una peticion a la BD.
Esta tecnica es util porque solo se consulta el repositorio al generar el token.
Ademas esto es benificioso en los microservicos porque no es necesario consultar la puerta de enlace, ni hace falta duplicar la informacion de los usuarios en los microservicios.

Los pasos para esto son:
-->

The reason, to put _userId_ inside JWT token, is to get user identifier without request repository. This technique is usefull because only one request is made to repository (only when the token is created).

Moreover this is profitable when microservices are used because isn't necessary request the _gateway_ to know the _userId_ for the current user. Neither is necessary duplicate all about user on every microservice.


The steps to do that are:

**1. Create a class to save the identifier**. This class must extend from _org.springframework.security.core.userdetails.User_.

<!--
**1 Crear una clase para guardar el id.** Esta clase debe extender de _org.springframework.security.core.UserDetails.User_.
-->

```java
package org.example.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import java.util.Collection;


public class CustomUserSession extends User{

    private Long userId = null;

    public CustomUserSession(String username, String password, Collection<? extends GrantedAuthority> authorities, String userId) {
        super(username, password, authorities);
        this.userId = new Long(userId);
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
```

**2. Add _getCurrentUserId_ method on _SecurityUtils_**.

<!--
**2. Crear el metodo getCurrentUserId en SecurityUtils**
-->

```java
/**
 * Get the id of the current user.
 *
 * @return the id of the current user
 */
public static Long getCurrentUserId() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    Long userId = null;
    if (authentication != null) {
        if (authentication.getPrincipal() instanceof CustomUserSession) {
            CustomUserSession springSecurityUser = (CustomUserSession) authentication.getPrincipal();
            userId = springSecurityUser.getUserId();
        }
    }

    return userId;
}
```

**3. Put _userId_ inside token**. Put the next changes inside _TokenProvider_:

- Add variable for json attribute
- Change the method to create token
- Change the method what read token

<!--
**3. Anadir dentro del token el userId** Dentro del _TokenProvider_ realizar los siguientes pasos:

- Anadir la variable descriptora
- Modificar el metodo que crea el token
- Modificar el metodo que lee el token
-->

```java
private static final String USER_ID = "userId";

    public String createToken(Authentication authentication, Boolean rememberMe, Long userId) {
        String authorities = authentication.getAuthorities().stream()
            .map(authority -> authority.getAuthority())
            .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity;
        if (rememberMe) {
            validity = new Date(now + this.tokenValidityInSecondsForRememberMe);
        } else {
            validity = new Date(now + this.tokenValidityInSeconds);
        }

        return Jwts.builder()
            .setSubject(authentication.getName())
            .claim(AUTHORITIES_KEY, authorities)
            .claim(USER_ID, userId)
            .signWith(SignatureAlgorithm.HS512, secretKey)
            .setExpiration(validity)
            .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()w
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .getBody();

        Collection<? extends GrantedAuthority> authorities =
            Arrays.asList(claims.get(AUTHORITIES_KEY).toString().split(",")).stream()
                .map(authority -> new SimpleGrantedAuthority(authority))
                .collect(Collectors.toList());

        User principal = new CustomUserSession(claims.getSubject(), "",
            authorities, claims.get(USER_ID).toString());

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }
```

**4 Get _userId_ from repository before create token**. Create token using id inside _UserJWTController_ file.

<!--
**4 Recuperar el userId desde Bd antes de crear el token** Dentro de _UserJWTController_ generar el token usando el userId.
-->

```java
	@Inject
	private UserRepository userRepository;
    
	public ResponseEntity<?> authorize(@Valid @RequestBody LoginVM loginVM, HttpServletResponse response) {
		...
		String jwt = tokenProvider.createToken(authentication, rememberMe, userRepository.findOneByLogin(loginVM.getUsername()).get().getId());
		... 
   }
```

Now you can use `SecurityUtils.getCurrentUserId()` to get user identifier.