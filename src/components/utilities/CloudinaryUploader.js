import React from "react";

import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";

export const CloudinaryUploader = ({successFunction, failureFunction}) => {
  
  return (
    <>
      <WidgetLoader />
      <Widget
        sources={["local", "url"]}
        
        resourceType={"auto"} 
        cloudName={"roninsatorimma"}
    

        
        
        uploadPreset={"dipkmwet"}
        buttonText={"Cargar imagen"}
         
        folder={"SatoriMMA"}
        cropping={false} 

        multiple={false}
        onSuccess={successFunction}
        onFailure={failureFunction}
        logging={false} 
        autoClose={true}
        eager={"w_400,h_300,c_pad|w_260,h_200,c_crop"} 
        use_filename={false}

        widgetStyles={{
          palette: {
            window: "#000000",
            sourceBg: "#000000",
            windowBorder: "#FFFFFF",
            tabIcon: "#FFFFFF",
            inactiveTabIcon: "#E5383B",
            menuIcons: "#E5383B",
            link: "#E5383B",
            action: "#A4161A",
            inProgress: "#E5383B",
            complete: "#E5383B",
            error: "#EA2727",
            textDark: "#000000",
            textLight: "#FFFFFF"
        },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Fira+Sans",
              active: true,
            },
          },
        }} // ability to customise the style of the widget uploader
        //destroy={true} // will destroy the widget on completion
      />
    </>
  );
};
