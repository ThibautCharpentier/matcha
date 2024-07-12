import '../style/Welcome.css'

export default function Welcome() {
    return (
        <div>
            <ul className="background">
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
            </ul>
            <div className='relative '>
			    <header className="flex flex-row justify-between m-6 items-center">
			    	<p className="">SMACK</p>
                	<button className="border-solid border-2 rounded-lg p-2">Connexion</button>
			    </header>
                <h1>Rencontre ton âme soeur</h1>
                <p>Trouve la meilleure personne pour toi ici</p>
                <button>Commencer</button>
            </div>
        </div>
    );
}
