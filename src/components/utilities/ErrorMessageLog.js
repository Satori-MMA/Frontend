import logo from "../../Assets/LogoPNG.png";

export const ErrorMessageLog = () => {
  return (
    <div>   
        <div className="text-center mt-5"><img src={logo} className="App-logo" alt="Loading..."/></div>
        <h2  className="text-white text-center">Parece que hay problemas de conexón</h2>
    </div>    
  );
};