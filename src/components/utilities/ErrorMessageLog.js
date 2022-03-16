import logo from "../../Assets/LogoPNG.png";

export const ErrorMessageLog = () => {
  return (
    <div>   
        <div className="text-center pt-5"><img src={logo} className="App-logo" alt="Loading..."/></div>
        <h2  className="text-white text-center">Parece que hay un problema, reportalo con los administradores de la aplicación</h2>
    </div>    
  );
};