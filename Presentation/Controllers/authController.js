const { userEntity } = require("../../domain/entities")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res) => 
{
    const { username, password } = req.body;
    try
    {
        const hashedPassword = await bcrypt.hash(password, 10);

        const storedUser = await userEntity.create({ id: uuidv4(), username, password: hashedPassword });
        res.json(storedUser);
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json({  error: "Username already taken" });        
    }
};

const signIn = async (req, res) => 
{
    const { username, password } = req.body;
    const storedUser = await userEntity.findOne({ where: { username}});
    if (!storedUser)
    {
        return res.status(400).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, storedUser.password);
    if (!isPasswordValid)
    {
        return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: storedUser.id }, "supersecretkeyjsisshit");
    res.json({ token });
};

module.exports =
{
    signUp,
    signIn,
};