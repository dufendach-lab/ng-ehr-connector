# Contents
1. [Standard Angular Commands](#ehrconnector)
2. [Smart On Fhir](#smartonfhir)
3. [Firebase Authentication](#firebase)

<a name="ehrconnector"></a>
# NgEhrConnector

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<a name="smartonfhir"></a>
# Smart on FHIR
Fast Healthcare Interoperability Resources, or FHIR, is a data standard developed by [HL7 International](http://hl7.org/fhir/summary.html) to suit the needs of providers, caregivers, and developers with the ever growing need for medical information exchange. FHIR is becoming the most popular service because of it’s internet-based approach and ease of use for developers to create full scale applications.

### Making the connection

We start in the authorize component where the patient can select which hospital to connect to.
The component takes the user's selection and sends the corresponding endpoint, client ID, and scope to the fhir clients authorization function.

    submit() {
      const params: AuthorizeParams = {
      iss: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/DSTU2/',
      clientId: 'YOUR_CLIENT_ID',
      scope: 'launch/patient'
    }
      this.auth.authorize(params);
    }

### Authorization State

The fhir-auth service holds all the behind the scenes code for our component to authorize and read this authorization.
When we authorize, the private `_client` subject is read and set in the `client` variable. We then pipe this `client` variable and map it to our observable boolean `authorized`.

    this.client = this._client.pipe(shareReplay(1));

    this.authorized = this.client.pipe(map(client => client && client.getPatientId() !== null));

    from(oauth2.ready()).subscribe(client => this._client.next(client));

Now, our site can confirm we have authorized this connection and move forward.

### Receiving Patient Data

To receive patient data after authorizing, we created an observation service which can access this client we had set before. We pipe it similar to before and make a request for this data using a given string and patientID. 


    async getData(type: string) : Promise<Observation | Bundle> {
      const client = await this.auth.client.pipe(first(c => c !== null)).toPromise();
      if (client) {
      const patientID = client.getPatientId();
    
      const res = await client.request(`/${type}?patient=${patientID}`);
      return res;
    
      } else {
        return Promise.reject('client is null');
      }
    }

We use this function in our patient data component. We create a Subject variable

    medBundle: Subject<Bundle | Observation> = new Subject();

and listen for any changes in `ngOnInit()`.

    this.obsService.getData('MedicationStatement').then(b => this.medBundle.next(b));

This is then un-bundled and displayed in our obs-value-display component.

<a name="firebase"></a>
# Firebase Authentication

Firebase makes it very easy to handle user creation and authentication in the backend. On top of that, the [Firebase Console](https://console.firebase.google.com/) makes it very easy to view your authorized users, perform CRUD operations in the Firestore, and host the app all in one place. 

### User Registration

As the app stands, users are not able to register an account for themselves. This is done on the staff side of the app in the Patient-New component.

The staff enters some basic user information, generates a random password, and sets the users role as `Patient`. This info is sent to the registration service like so:

    onSubmit() {
      try {
        this.reg.createPatient(this.registration.value['email'],
        this.registration.value['password1'],
        ('+1' + this.registration.value['phone']))
        .then((result) => {
          if(result) {
          this.regInfo.firstName = this.registration.value['firstname'];
          this.regInfo.lastName = this.registration.value['lastname'];
          this.regInfo.MotherDoB = this.registration.value['MotherDoB'];
          this.regInfo.phone = ('+1' + this.registration.value['phone']);
          this.regInfo.roles = ["Patient"];
          this.reg.createPatientInfo(result, this.regInfo).then(() => {
            this.router.navigate(['/admin-list']);
          });
          }
        });
      } catch (e) {
        this.emailInUse = true;
      }
    }

In our registration service, the info sent from our component is taken in to our createPatient function and passed along to our cloud function.
The reason this is done as a cloud function is because we are setting up two ways for the user to authenticate: Email/Password and by Phone. This is only possible using the firebase admin sdk.

    exports.createUser = functions.https.onCall(async (data, context) => {
      return new Promise((res, rej) => {
        if (!context.auth) {
          throw new functions.https.HttpsError("failed-precondition", "The function must be called while authenticated");
        }
        admin.auth().createUser({
          email: data.email,
          emailVerified: true,
          phoneNumber: data.phoneNumber,
          password: data.password,
          displayName: data.displayName,
        }).then((userRecord) => {
          if (userRecord) {
            res(userRecord.toJSON());
          } else {
            rej(error("Failed to create new user."));
          }
        });
      });
    });

Now we have created a new user!

### Authentication / Login

The authentication components can be found in the core components' folder because they decide whether to send a user to the patient or staff side. Similar to registration, firebase makes it extremely simple to authorize users.
It utilizes OAuth2 and OpenID connect to easily integrate into our backend.

To start, I am going to show the email/password login since it uses a bit less code. In our login component, we have a simple form for the user to enter their email and password. When they submit this form, our component sends this info to our auth service for verification.

    tempLogin() {
      this.auth.checkCredentials(this.login.controls['email'].value, this.login.controls['password'].value)
        .then(() => {
          this.router.navigate(['']);
        });
    }

Then in our service we use AngularFireAuth's `signInWithEmailAndPassword` function:

    checkCredentials(email: string, pword: string) {
      return this.afa.signInWithEmailAndPassword(email, pword);
    }

For our app to know we have signed in, we set a readonly observable called `user` to listen for this login. Our other components can use this observable to let the user into the app.

    readonly user = this.afa.user;

Now we are authorized and can access the app!
