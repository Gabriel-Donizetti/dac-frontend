import { useHomeViewModel } from '../view-models/HomeViewModel';
import HomeHeader from '../components/HomeHeader';
import '../styles/Home.css';  // Caminho relativo correto

function HomeView() {
  const { homeContent, navigateTo } = useHomeViewModel();

  return (
    <div className="home-container">
      <HomeHeader />
      
      <main>
        <h1>{homeContent.title}</h1>
        <p>{homeContent.description}</p>
        
        <div className="features">
          <h2>Recursos:</h2>
          <ul>
            {homeContent.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <div className="actions">
          <button onClick={() => navigateTo('/cliente/login')}>
            Área do Cliente
          </button>
          <button onClick={() => navigateTo('/sobre')}>
            Conheça Nossa Empresa
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomeView;