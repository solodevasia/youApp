import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  console.log(request.body);
  const data = await fetch("http://localhost:4000/api/v1/user/created", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request.body),
  }).then(async (resp) => await resp.json());
  if (data.status <= 201) {
    res.status(200).json(true);
  }
}
