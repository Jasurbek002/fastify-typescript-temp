import { User } from "../../Models/User";
import { FastifyReply, FastifyRequest } from "fastify";

async function GET(req: FastifyRequest, rep: FastifyReply) {
  try {
    const data = await User.findAll();
    rep.send(data);
  } catch (error) {
    throw error;
  }
}

async function POST(req: any, rep: FastifyReply) {
  try {
    const { firstName, lastName, age } = req.body;
    const user = await User.create({ firstName, lastName, age });
    rep.code(200).send({ message: "successfuly added!", data: user });
  } catch (error) {
    rep.code(500).send({ error: "Internal Server Error" });
  }
}

async function PUT(req: any, rep: FastifyReply) {
  try {
    const { userId } = req.params;
    const { firstName } = req.body;
    const user = await User.findByPk(userId);
    if (user) {
      const data = await user.update({ firstName });
      rep.code(200).send({
        message: "Successfuly updated!",
        data: data,
      });
    } else {
      rep.code(404).send({
        message: "user not found!",
        data: null,
      });
    }
  } catch (error) {
    rep.code(500).send({ error: "internal server error" });
  }
}

async function DELETE(req: any, rep: FastifyReply) {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      rep.code(200).send({
        message: "Successfully deleted!",
      });
    } else {
      rep.code(404).send({
        message: "User not found!",
      });
    }
  } catch (error) {
    rep.code(500).send({ error: "Internal server error" });
  }
}

export default { GET, POST, PUT, DELETE };
