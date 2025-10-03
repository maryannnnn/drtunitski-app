// Серверный редирект для /en маршрута
export async function getServerSideProps() {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  
  export default function EnPage() {
    return null;
  }