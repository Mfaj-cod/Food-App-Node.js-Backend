const testUserController = (req, res) => {
    try {
        res.status(200).send({
            success:true,
            message:`test user data API`
        });

    } catch (error) {
        console.log(`Found an error in test API: ${error.message}`);
    }
};

module.exports = { testUserController }