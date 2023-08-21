import instanceApi from "@/config/axios-config";

export const getServerSideProps = async () => {
    const { data } = await instanceApi.get(`/api/website-config`);

    return {
        props: {
            config: data?.config,
        },
    };
};

export const withInitProps = (serverFn) => {
    return async (req, res) => {
        const result = await serverFn(req, res);
        const config = await getServerSideProps(req);

        return {
            ...result,
            props: {
                ...config.props,
                ...result.props,
            },
        };
    };
};
