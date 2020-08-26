import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

export default class Stage extends Component {

    componentDidMount() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor('white');
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.mount.prepend( renderer.domElement );
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 5;
        const animate = function () {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        };
        animate();
    }

    render() {
        return (
            <div className="stage" ref={ref => (this.mount = ref)}>
                {this.props.children}

                <page id="1">
                    <Text>
                        Wählen Sie ihre Zaunserie aus
                    </Text>
                    {[
                        "",
                        "",
                    ].map(url=>(
                        <Image src={url}></Image>
                    ))}
                    {/*
                    nach Auswahl werden im Hintergrund 3D-Elemente der Serie Prefetched
                    */}
                </page>

                <page id="2">
                    <Text>
                        Welchen Grundriss hat ihr Zaun?
                    </Text>
                    <Button>
                    <Object3D id="Strecke">
                    </Object3D>
                    </Button>
                    <Object3D id="Rechteck">
                    </Object3D>
                    <Object3D id="L-Form">
                    </Object3D>
                    {/*
                    3 Auswahl - Buttons(?) erscheinen, sind 2D-Linien im 3D-Raum
                    Nach Klick blendet sich alles bis auf die gewählte Form aus,
                    diese zoomt heran und füllt den Bildschirm
                    */}
                </page>

                <page id="3">
                    <Text>
                        Welche Maße hat ihr Zaun?
                    </Text>
                    <Button>
                        Fertig
                    </Button>
                    {/*
                       An der 3D-Form werden HTML-Eingabefelder angezeigt

                       Nach Klick auf Fertig blendet sich alles bis auf die Grundrisslinien aus
                    */}
                </page>

                <page id="4">
                    <Text>
                        Voila, ihr Zaun!
                    </Text>
                    {/*
                    Kamera zoomt seitlich an den Zaun, füllt sich mit Elementen
                    */}
                </page>

            </div>
    )
    }
}


/*




 */