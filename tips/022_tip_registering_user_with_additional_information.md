---
layout: default
title:  Enregistrer un utilisateur avec des informations supplémentaires
sitemap:
priority: 0.5
lastmod: 2017-02-15T22:30:00-00:00
---

# Enregistrer un utilisateur avec des informations supplémentaires

__Conseil soumis par [@Paul-Etienne](https://github.com/Paul-Etienne)__

Si nous avons besoin de stocker plus d'informations concernant un utilisateur que ce que JHipster fournit par défaut, quelques ajustements sont nécessaires.

Pour illustrer cela, supposons que nous voulions stocker le numéro de téléphone de l'utilisateur.

## Création d'une nouvelle entité dans une relation de type Un à Un avec JHI_User

La meilleure façon d'ajouter des informations qui ne sont pas gérées par l'utilisateur par défaut de JHipster est d'utiliser la composition dans une nouvelle entité liée à celui-ci avec une relation de type Un à Un.

Après la création de cette entité, appelons-la UserExtra, la meilleure façon de gérer son id est de le mapper sur celui de JHI_User. De cette façon, notre UserExtra aura le même id que celui de l'utilisateur, accélérant ainsi les différentes requêtes.
Pour cela, vous devrez utiliser l'annotation @MapsId :

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

Notez que l'annotation @GeneratedValue sur l'id doit être supprimée.

## Mise à jour de la page HTML d'enregistrement pour prendre en compte ce changement

Maintenant qu'une entité existe pour stocker le numéro de téléphone, nous devons ajouter un champ de saisie dans le formulaire d'inscription pour demander le numéro de téléphone de l'utilisateur.

Rien de plus simple, il suffit de mettre à jour webapp/app/account/register/register.html pour ajouter un champ d'entrée lié à la variable déjà utilisée pour stocker les informations de base (vm.registerAccount) :

```
<input class="form-control" id="phone" ng-model="vm.registerAccount.phone" placeholder="{{'global.form.phone.placeholder' | translate}}" />
```

## Mise à jour de ManagedUserVM

La fonction registerAccount() de java/com.mycompany.myapp/web/rest/AccountResource est celle qui reçoit la demande de la page d'inscription.
Son seul paramètre est un objet ManagedUserVM contenant les informations initialement contenues dans la variable vm.registerAccount du client.

Cette classe ManagedUserVM située dans web/rest/vm doit également être mise à jour afin qu'elle contienne le numéro de téléphone envoyé par le client. La seule chose à faire ici est d'ajouter l'attribut numéro de téléphone et son getter :

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

## Mise à jour de la fonction registerAccount() de AccountResource

La fonction registerAccount() reçoit maintenant un objet ManagedUserVM qui contient également le numéro de téléphone de l'utilisateur. Il ne reste plus qu'à sauvegarder ce numéro de téléphone dans un nouveau UserExtra associé à l'utilisateur JHipster.

Pour ce faire, nous allons ajouter le paramètre phone à la fonction createUser() de UserService. Mais d'abord, ajoutez ce paramètre là où cette fonction est appelée dans registerAccount() :

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

## Mise à jour de la fonction createUser() de UserService

Enfin, nous mettons à jour la fonction de la couche de service qui sauvegarde l'utilisateur JHI pour maintenant sauvegarder également UserExtra. Plutôt que de mettre à jour la fonction existante, je vous suggère de créer une nouvelle avec le paramètre supplémentaire. De cette façon, il n'est pas nécessaire de mettre à jour les classes de test.

N'oubliez pas d'injecter les dépôts UserExtra :

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

Et voilà !
