---
layout: default
title: Registering a user with additional information
sitemap:
priority: 0.5
lastmod: 2017-02-15T22:30:00-00:00
---

# Registering a user with additional information

__Tip submitted by [@Paul-Etienne](https://github.com/Paul-Etienne)__

If we need to store more information concerning a user than what JHipster provides by default, a few tweaks are needed.

To illustrate this, let's assume we want to store the user's phone number.

## Creating a new entity in a One to One relationship with JHI_User

The best way to add information that is not handled by the default JHipster User is by using composition in a new entity linked to it with a One to One relationship.

After this entity is created, let's call it UserExtra, the best way to handle its id is by mapping it to the JHI_User's one. This way, our UserExtra will have the same id as the User's, accelerating the different requests.
To achieve this, you will need to use the @MapsId annotation :

```
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "phone")
    private String phone;

    @OneToOne
    @MapsId
    private User user;
    ...

}
```

Note that the @GeneratedValue annotation on the id needs to be removed.

## Updating the register HTML page to take this change into account

Now that an entity exists to store the phone number, we need to add an input in the register form to ask for the user's phone number.

Nothing easier than that, just update webapp/app/account/register/register.html to add an input field bound to the variable already used to store the basic information (vm.registerAccount) :

```
<input class="form-control" id="phone" ng-model="vm.registerAccount.phone" placeholder="{{'global.form.phone.placeholder' | translate}}" />
```

## Updating ManagedUserVM

The registerAccount() function from java/com.mycompany.myapp/web/rest/AccountResource is the one receiving the request from the registration page.
Its only parameter is a ManagedUserVM object containing the information initially contained in the vm.registerAccount variable from the client.

This ManagedUserVM class located in web/rest/vm has to be updated as well so that it holds the phone number sent by the client. The only thing to do here is adding the phone number attribute and its getter :

```
public class ManagedUserVM extends UserDTO {

    // Default attributes omitted for brevity

    private String phone;

    ...

    public String getPhone() {
        return phone;
    }

}
```

## Updating the registerAccount() function from AccountResource

The registerAccount() function now receives a ManagedUserVM object that also contains the phone number of the user. The only thing left to do is saving this phone number into a new UserExtra associated with the JHipster User.

To do so, we are going to add the phone parameter to the createUser() function from UserService. But first, add this parameter where this function is called in registerAccount() :

```
public ResponseEntity<?> registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {

    HttpHeaders textPlainHeaders = new HttpHeaders();
    textPlainHeaders.setContentType(MediaType.TEXT_PLAIN);

    return userRepository.findOneByLogin(managedUserVM.getLogin().toLowerCase())
        .map(user -> new ResponseEntity<>("login already in use", textPlainHeaders, HttpStatus.BAD_REQUEST))
        .orElseGet(() -> userRepository.findOneByEmail(managedUserVM.getEmail())
            .map(user -> new ResponseEntity<>("e-mail address already in use", textPlainHeaders, HttpStatus.BAD_REQUEST))
            .orElseGet(() -> {
                User user = userService
                    .createUser(managedUserVM.getLogin(), managedUserVM.getPassword(),
                        managedUserVM.getFirstName(), managedUserVM.getLastName(),
                        managedUserVM.getEmail().toLowerCase(), managedUserVM.getLangKey(),
                        managedUserVM.getPhone());

                mailService.sendActivationEmail(user);
                return new ResponseEntity<>(HttpStatus.CREATED);
            })
    );
}
```

## Updating the createUser() function from UserService

Finally, we update the service layer function that saves the JHI_User to now save the UserExtra as well. Rather than updating the existing function, I suggest you create a new one with the additional parameter. This way, updating the test classes isn't necessary.

Do not forget to inject the UserExtra repositories :

```
@Inject
private UserExtraRepository userExtraRepository;

@Inject
private UserExtraSearchRepository userExtraSearchRepository;

...

public User createUser(String login, String password, String firstName, String lastName, String email,
                           String langKey, String phone) {

    User newUser = new User();
    Authority authority = authorityRepository.findOne(AuthoritiesConstants.USER);
    Set<Authority> authorities = new HashSet<>();
    String encryptedPassword = passwordEncoder.encode(password);
    newUser.setLogin(login);
    // new user gets initially a generated password
    newUser.setPassword(encryptedPassword);
    newUser.setFirstName(firstName);
    newUser.setLastName(lastName);
    newUser.setEmail(email);
    newUser.setLangKey(langKey);
    // new user is not active
    newUser.setActivated(false);
    // new user gets registration key
    newUser.setActivationKey(RandomUtil.generateActivationKey());
    authorities.add(authority);
    newUser.setAuthorities(authorities);
    userRepository.save(newUser);
    userSearchRepository.save(newUser);
    log.debug("Created Information for User: {}", newUser);

    // Create and save the UserExtra entity
    UserExtra newUserExtra = new UserExtra();
    newUserExtra.setUser(newUser);
    newUserExtra.setPhone(phone);
    userExtraRepository.save(newUserExtra);
    userExtraSearchRepository.save(newUserExtra);
    log.debug("Created Information for UserExtra: {}", newUserExtra);

    return newUser;
}
```

And it's done !
