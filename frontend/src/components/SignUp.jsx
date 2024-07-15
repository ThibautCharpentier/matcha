export default function SignUp() {
  return (
    <div>
        <div>
          <h1>Créer un compte</h1>
          <p>Vous avez déjà un compte ? <span>Se connecter</span></p>
          <form action="">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="name">Prénom</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="lastname">Nom</label>
            <input type="text" name="lastname" id="lastname"/>
            <label htmlFor="mail">Mail</label>
            <input type="text" name="mail" id="mail" />
            <label htmlFor="password">Mot de passe</label>
            <input type="text" name="password" id="password" />
            <label htmlFor="confirmpassword">Confirmer mot de passe</label>
            <input type="text" name="confirmpassword" id="confirmpassword" />
          </form>
        </div>
    </div>
  )
}