import { Company, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestData = {
  name: string;
  description: string;
};

type ResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { name, description }: RequestData = JSON.parse(req.body);
    console.log();

    const prisma = new PrismaClient();
    await prisma.company.create({
      data: { name: name, description: description },
    });

    res.status(200).send("success");
  } else {
    res.status(405).end("Method Not Allowed");
  }
}
