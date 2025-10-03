// Специальная страница для обработки /en маршрута
// Выполняет серверный редирект на корневую страницу
export async function getServerSideProps(context) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  
  // Компонент не будет отрендерен из-за редиректа
  export default function EnPage() {
    return null;
  }
  