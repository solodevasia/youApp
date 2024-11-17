import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch("http://localhost:4000/api/v1/user/upload/avatar", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${req.headers.cookie?.split("token=")?.join("")}`,
    },
    body: req.body,
  });

  console.log(data, "<<<> data", req.headers.cookie?.split("token=")?.join(""));
  res.status(200).json(true);
}
