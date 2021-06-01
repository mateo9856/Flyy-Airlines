import React, { Component } from 'react';
import "../css/AboutUs.css";
export class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="aboutBackground">
                <div className = "aboutBlock text-center">
                <h1 className="text-center">Kim jesteśmy ?</h1>
                <p>Jesteśmy nową marką, zajmujemy się wylotami do różnych krajów. Lecimy fo krajów takich jak np.
                    Wielka Brytania, Włochy, Hiszpania itp.<br />
                Nasza firma stale rozwija się w zakresie wylotów i dąży do dalszego rozwoju z zakresu podróży.</p>
                    <h1 className="text-center">Jak to wszystko się zaczęło ?</h1>
                    <p>Naszym planem było i jest nadal stworzenie alternatywy dla każdego, oferując wsparcie najlepszych ludzi oraz konkurencyjność, staramy się być jak najlepsi dla państwa.<br />
                    To co nas uczy to państwo, to opinie klientów oraz porady są dla nas podstawą do rozwoju firmy!
                    </p>
                </div>
            </div>
        );
      }
}