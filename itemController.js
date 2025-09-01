const { itemEntity, userEntity } = require(".");
const { v4: uuidv4 } = require("uuid");

exports.getItems = async (req, res) => 
{
    const storedItems = await itemEntity.findAll({ where: { userId: req.user.Id } });

    res.json(storedItems);
};

exports.addItem = async (req, res) => 
{
    const { name } = req.body;
    console.log(req.user.id);
    const storedItem = itemEntity.create({ id: uuidv4(), name, userId: req.user.id });

    res.json(storedItem);
};

exports.updateStatus = async (req, res) =>
{
    const { id } = req.params;
    const { status } = req.body;

    const storedItem = await itemEntity.findOne({ where: { id, userId: req.user.id }});
    if (!storedItem)
    {
        return res.status(404).json({ error: "Item not found" });
    }

    storedItem.status = status;

    await storedItem.save();

    res.json(storedItem);
};

exports.clearItems = async (req, res) =>
{
    await itemEntity.destroy({ where: { userId: req.user.id } });
    
    res.json({message: "Cleared"});
};

exports.transferList = async (req, res) => 
{
    const {toUserId} = req.body;

    const storedItems = itemEntity.findAll({ where: { userId: req.user.id, status: "planned" }});
    
    const transferred = await Promise.all(
        storedItems.map(storedItem => itemEntity.create({ name: storedItem.name, status: "planned", userId: toUserId }))
    );

    res.json({ message: `Transferred ${transferred.length} items` });
    
};