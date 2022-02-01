import logo from "../../Assets/LogoPNG.png";

export const LoadingMessage = () => {
  return (
    <div>   
        <div className="text-center mt-5"><img src={logo} className="App-logo" alt="Loading..."/></div>
        <h2  className="text-white text-center">Estamos trabajando en la aplicación 👨‍💻</h2>
    </div>    
  );
};