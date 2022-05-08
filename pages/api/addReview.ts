import { PrismaClient, Rating } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestData = {
  id: number;
  summary: string;
  description?: string;
  points: number;
};

type ResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { summary, description, id, points }: RequestData = JSON.parse(
      req.body
    );
    console.log(req.body);

    const prisma = new PrismaClient();
    await prisma.rating.create({
      data: { summary, description, points, companyId: id },
    });

    res.status(200).send("success");
  } else {
    res.status(405).end("Method Not Allowed");
  }
}
