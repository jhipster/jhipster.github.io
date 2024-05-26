---
layout: default
title: Comment supprimer le service d'inscription de compte
sitemap:
priority: 0.1
lastmod: 2021-03-19T21:22:00-00:00
---
# Comment supprimer le service d'inscription de compte

__Astuce soumise par [@apuntandoanulo](https://github.com/apuntandoanulo)__

_Objectif:_ Si vous souhaitez éliminer la possibilité pour les utilisateurs de créer des comptes et permettre uniquement à un utilisateur préalablement enregistré de le faire, supprimez les fragments et les lignes de code suivants qui sont indiqués ci-dessous :

## 1. Du côté du back-end

* ___1.1___  src\main\java\ ... \service\UserService.java
  - Supprimez la méthode entière `public User registerUser(...)`
* ___1.2___ src\main\java\ ... \rest\AccountResource.java
  - Supprimez la méthode entière `@PostMapping("/register")   public void registerAccount(...)`

## 2. Du côté du front-end

* ___2.1___ src\main\webapp\app\account\
  - Supprimez le dossier entier `register` qui contient : `register.component.html`, `register.component.ts`, `register.route.ts`, `register.service.ts`

* ___2.2___ Accédez à `src\main\webapp\app\account\account.module.ts` et supprimez les lignes suivantes :
  - ``` import { RegisterComponent } from './register/register.component'; ```
  - tableau _declarations_ -> ```  RegisterComponent, ```

* ___2.3___ Accédez à `src\main\webapp\app\account\account.route.ts` et supprimez les lignes suivantes :
  - ``` import { registerRoute } from './register/register.route'; ```
  - tableau _ACCOUNT_ROUTES_ -> ```  registerRoute ```

* ___2.4___ Accédez à `src\main\webapp\app\home\home.component.html` et supprimez le bloc suivant :

  ```
  <div class="alert alert-warning" *ngSwitchCase="false">
    <span jhiTranslate="global.messages.info.register.noaccount">You don't have an account yet?</span>&nbsp;
    <a class="alert-link" routerLink="account/register" jhiTranslate="global.messages.info.register.link">Register a new account</a>
  </div>
  ```

* ___2.5___ Accédez à `src\main\webapp\app\layouts\navbar\navbar.component.html` et supprimez le bloc suivant :
  ```
  <li *ngSwitchCase="false">
    <a class="dropdown-item" routerLink="account/register" routerLinkActive="active" (click)="collapseNavbar()">
        <fa-icon icon="user-plus" [fixedWidth]="true"></fa-icon>
        <span jhiTranslate="global.menu.account.register">Register</span>
    </a>
  </li>
  ```

* ___2.6___ Accédez à `src\main\webapp\app\shared\login\login.component.html` et supprimez le bloc suivant :
  ```
  <div class="alert alert-warning">
    <span jhiTranslate="global.messages.info.register.noaccount">You don't have an account yet?</span>
    <a class="alert-link" (click)="register()" jhiTranslate="global.messages.info.register.link">Register a new account</a>
  </div>
  ```

* ___2.7___ Accédez à `src\main\webapp\app\shared\login\login.component.ts` et supprimez le bloc suivant :
  ```
  register(): void {
    this.activeModal.dismiss('to state register');
    this.router.navigate(['/account/register']);
  }
  ```

* ___2.8___ Supprimez les fichiers de messages :  ``` src\main\webapp\i18n\ ... \register.json ```

* ___2.9___ src\test\javascript\spec\app\account
  - Supprimez le dossier entier `register` qui contient :  `register.component.spec.ts`
