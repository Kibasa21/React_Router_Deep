import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {

    const fetcher = useFetcher();//useFetcher é bom quando você quer fazer uma ação por debaixo dos panos, sem a necessidade de navegar para a página a que um deles pertence.
    const {data, state} = fetcher;//data é o dado que você quer pegar e state é o estado do fetcher
    //fetcher é bom quando você quer fazer algo sem carregar uma pagina ou um route
    useEffect(() => {
        if(state === 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [data, state]);
  
    return (//a action no form vai acessar a action da route /newsletter sem ir para o elemento que está atrelado a essa route
    <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}> {/* fetcher.Form serve para quando você quer usar uma action ou uma loader sem necessariamente navegar para a página a que um deles pertence. */}
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;