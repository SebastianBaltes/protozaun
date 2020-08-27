import React from 'jsx-dom';
import _ from 'lodash';
import * as THREE from "three";

export default function App() {

    const colors = ['white','#527a7a','#eef7f5','#e6f7ff','#f0f5f5','#faf3ea','#e0ebeb'];

    const stageElement = (
        <div class="stage">
        </div>
    );

    const initStage = ()=>{
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor('white');

        // ups - direkter Zugriff auf stageElement liefert 0, daher hier neu aus dem Dom holen
        const stageElement = document.querySelector('.stage');
        const rect = stageElement.getBoundingClientRect();
        console.log('rect',rect );
        renderer.setSize( rect.width, rect.height );
        stageElement.prepend( renderer.domElement );
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 5;
        const animate = () => {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        };
        animate();
        window.addEventListener('resize', ()=>{
            const rect = stageElement.getBoundingClientRect();
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            renderer.setSize( rect.width, rect.height );
        });
    }

    const selectorAll = (...selectors)=>[...document.querySelectorAll(...selectors)];

    const pages = {
        show(name) {
            document.querySelector('.page')?.remove();
            const page = pages[name];
            const element = page.render();
            element.classList.add("hidden");
            document.querySelector('.app').append(element);
            _.delay(()=>element.classList.remove('hidden'),300);
            page.init();
        },


        intro: {
            init() {
                selectorAll('.hidden').forEach((element,index)=>{
                    _.delay(()=>element.classList.remove('hidden'),(index+1)*1000);
                });
            },
            render() {
                return (
                    <div class="page fade">
                        <div class="question fade">

                            <p>Herzlich willkommen beim Traumgarten Zaunplaner :)</p>

                            <p class="help fade hidden">Mit dieser App können sie ihren Zaun planen.</p>

                            <p class="help fade hidden">Ich werde ihnen dazu eine Reihe von Fragen stellen, an derem
                                Ende sie einen fertig geplanten
                                Zaun und einen Preis haben.</p>

                        </div>
                        <div class="button grow shadow fade hidden"
                             onclick={(event) => {
                                 _.delay(() => document.querySelector('.question').classList.add('hidden'), 300);
                                 _.delay(() => document.querySelector('.page').classList.add('hidden'), 1000);
                                 _.delay(() => pages.show("inspiration"), 1300);
                             }}>
                            Dann los!
                        </div>
                    </div>
                );
            },
        },

        inspiration: {
            init() {
                selectorAll('.tile').forEach((tile,index)=>{
                    _.delay(()=>tile.classList.remove('hidden'),2000+index*100);
                });
                _.delay(()=>document.querySelector('.page .help').classList.remove('hidden'),1500);
            },
            render() {
                return (
                    <div class="page fade">
                        <div class="question fade">
                            <p>
                                1. Wie soll ihr Zaun aussehen?
                            </p>
                            <p className="help fade hidden">
                                Klicken sie auf eines der Bilder
                            </p>
                        </div>
                        {/*<div class="button grow shadow">*/}
                        {/*    Hello World*/}
                        {/*</div>*/}
                        <div class="tiles">
                            {_.range(1,20).map(nr=>(
                                <div class="tile grow shadow fade hidden"
                                     style={`background-color: ${colors[nr%colors.length]}; background-image: url(res/inspiration/inspiration_${nr}.png)`}
                                     onclick={(event)=> {
                                         const target = event.target;
                                         const clone = target.cloneNode(true);
                                         const pos0 = target.getBoundingClientRect();
                                         _.delay(()=>document.querySelector('.page').classList.add('hidden'),300);
                                         clone.style.position=`absolute`;
                                         clone.style.transition=`none`;
                                         document.querySelector('.breadcrums').append(clone);
                                         const pos1 = clone.getBoundingClientRect();
                                         const delta = {x:pos0.x-pos1.x+8,y:pos0.y-pos1.y+8};
                                         clone.style.transform=`translate(${Math.round(delta.x)}px,${Math.round(delta.y)}px) scale(1.1)`;
                                         _.delay(()=>{
                                             clone.style.transition="all 0.5s ease-out";
                                             clone.style.transform="translate(0px,0px) scale(1)"
                                             clone.classList.add("breadcrum");
                                             _.delay(()=>pages.show("serieInfo"),1000);
                                         },1300);
                                     }}>
                                    <div class="title">
                                        Serie {nr}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="comment">
                            Vorschlag: Hier vielleicht besser "echte" Bilder bzw. aus dem Katalog
                        </div>
                    </div>
                );
            },
        },

        serieInfo: {
            init() {
                selectorAll('.hidden').forEach((element,index)=>{
                    _.delay(()=>element.classList.remove('hidden'),(index+1)*1000);
                });
            },
            render() {
                return (
                    <div class="page fade">
                        <div class="question fade">
                            <p>
                                Die Serie Rhombus zeichnet sich durch besondere Witterungsbeständigkeit aus
                            </p>
                            <p className="help fade hidden">
                                Hier wird rotierend das 3D-Objekt eines Beispielzaunes angezeigt
                            </p>
                        </div>
                        <div className="button grow shadow fade hidden"
                             onClick={(event) => {
                                 const target = event.target;
                                 selectorAll('.button').forEach((element,index)=>{
                                     if (element!==target) {
                                         _.delay(()=>element.classList.add('hidden'), 300);
                                     }
                                 });
                                 _.delay(() => document.querySelector('.question').classList.add('hidden'), 300);
                                 _.delay(() => document.querySelector('.page').classList.add('hidden'), 1000);
                                 _.delay(() => pages.show("inspiration"), 1300);
                             }}>
                            Nein, lieber eine andere Serie anschauen
                        </div>
                        <div className="button grow shadow fade hidden"
                             onClick={(event) => {
                                 const target = event.target;
                                 selectorAll('.button').forEach((element,index)=>{
                                     if (element!==target) {
                                         _.delay(()=>element.classList.add('hidden'), 300);
                                     }
                                 });
                                 _.delay(() => document.querySelector('.question').classList.add('hidden'), 300);
                                 _.delay(() => document.querySelector('.page').classList.add('hidden'), 1000);
                                 _.delay(() => pages.show("form"), 1300);
                             }}>
                            Diese Serie ist toll!
                        </div>
                    </div>
                ); 
            },
        },

        form: {
            init() {
                selectorAll('.tile').forEach((tile,index)=>{
                    _.delay(()=>tile.classList.remove('hidden'),2000+index*300);
                });
                _.delay(()=>document.querySelector('.page .help').classList.remove('hidden'),1500);
            },
            render() {
                return (
                    <div class="page fade">
                        <div class="question fade">
                            <p>
                                2. Welche Form soll der Grundriss ihres Zaunes haben?
                            </p>
                            <p className="help fade hidden">
                                Klicken sie auf eines der Bilder
                            </p>
                        </div>
                        <div class="tiles">
                            {[{title:'Strecke',file:'strecke.svg'},
                                {title:'Rechteck',file:'recheck.svg'},
                                {title:'L-Form',file:'l-form.svg'}].map(({title,file}) => (
                                <div class="tile form grow shadow fade hidden"
                                     style={`background-image: url(res/form/${file})`}
                                     onclick={(event) => {
                                     }}>
                                    <div className="title">
                                        {title}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="comment">
                        </div>
                    </div>
                );
            },
        }
    };

    document.body.appendChild((
        <div class="app">
            <div class="breadcrums">
            </div>
            {stageElement}
        </div>
    ));

    initStage();

    pages.show("intro");

}