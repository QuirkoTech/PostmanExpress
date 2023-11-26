import Layout from "../components/layout/Layout";
import { ActiveParcelPage } from "../pages";

const HomePage = () => {
    return (
        <Layout>
            {/* Change page base on account status */}
            <ActiveParcelPage></ActiveParcelPage>
        </Layout>
    );
};

export default HomePage;
