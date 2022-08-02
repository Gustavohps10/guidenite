import { Link } from "react-router-dom";
import Guide from "../components/Guide";
import screenshot from "screenshot-desktop";
import Jimp from "jimp";
import {Photo2Icon, BackIcon, DesktopScreenshotIcon, VideoIcon, PhotoCollectionIcon, CancelIcon, SaveIcon} from "@fluentui/react-icons-mdl2"
import Item from "../components/Item";
import Modal from "../components/Modal"
import InputText from "../components/InputText"
import path from "path"
import { useState } from "react";
import "../styles/gallery.scss"
import loadingGif from "../assets/images/loading.gif"

export default function Gallery() {
    const [guideHide, setGuideHide] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [screenshotImg, setScreenshotImg] = useState({})
    const [screenshotName, setScreenshotName] = useState("")
    const dirpath = path.join(__dirname, '/screenshots/')

    function handleScreenshot() {
        setGuideHide(true)
        setModalVisible(false)
        setTimeout(() => {
            screenshot({format: 'png'}).then((img) => {
                let base64 = "data:image/png;base64," + img.toString('base64');
                setScreenshotImg({
                    ...screenshotImg, 
                    base64: base64,
                    buffer: img
                });
                setGuideHide(false)
                setModalVisible(true)
            })
            
        }, 1000);
    }

    function saveScreenshot(){
        if(screenshotName.trim()){
            Jimp.read(screenshotImg.buffer, (err, image) => {
                image.write(dirpath + screenshotName.trim() + ".png");
            });
            cancelScreenshot()
        }else{

        }
    }

    function cancelScreenshot() {
        setModalVisible(false)
        setScreenshotImg({})
        setScreenshotName("")
    }
    
    return (
        <>  
            <Guide hide={guideHide}>
                <div className="content">
                    <h1><Photo2Icon/> <span>Galeria</span> </h1>
                    <div className="main-items">
                        <Link tabIndex="-1" to="/"><Item text="Voltar" image={<BackIcon/>}/></Link>
                        <Item 
                            image={ <DesktopScreenshotIcon/>} 
                            text="Capturar tela"
                            onClick={()=>handleScreenshot()}
                        />
                    </div>
                    <hr />
                    <div className="main-items">
                        <Link to="/screenshots" tabIndex="-1"><Item image={<PhotoCollectionIcon/>} imageBackgroundColor="#5e2c5e" text="Minhas capturas"/></Link>
                        <Item image={<VideoIcon/>} imageBackgroundColor="#29297c" text="Meus videos"/>
                    </div>
                </div>
            </Guide>
            
            <Modal visible={modalVisible}>
                {!screenshotImg.base64 &&
                    (
                        <div className="loading">
                            <h1>Aguarde, sua captura está quase pronta! </h1>
                            <img src={loadingGif} alt="loading" />
                        </div>
                    )
                }

                {screenshotImg.base64 &&
                    (
                        <div className="screenshot-options">
                            <h1><DesktopScreenshotIcon/> Sua captura</h1>
                            <img src={screenshotImg.base64} />
                            <div className="items">
                                <InputText 
                                    value={screenshotName} 
                                    placeholder="Nome da captura" 
                                    icon={<Photo2Icon/>}
                                    onChange={e => setScreenshotName(e.target.value)}
                                />
                
                                <Item text="Cancelar" image={<CancelIcon/>} onClick={cancelScreenshot}/>
                                <Item text="Salvar"image={<SaveIcon/>} onClick={saveScreenshot} />
                            </div>
                        </div>
                    )
                }
               
            </Modal>
        </>
    )
}