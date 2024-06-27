// import { Webhook } from "svix";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import { db } from "~/server/db";
// import { users } from "~/server/db/schema";

// export default async function handler(req, res) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   const headers = req.headers;
//   const payload = await req.body;

//   const wh = new Webhook(WEBHOOK_SECRET);
//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(payload, headers) as WebhookEvent;
//   } catch (err) {
//     return res.status(400).json({});
//   }

//   const { id, first_name, last_name, image_url } = evt.data;

//   if (evt.type === "user.created") {
//     await db.insert(users).values({
//       userId: id,
//       fullName: `${first_name} ${last_name}`,
//       profileImageUrl: image_url,
//     });
//   }

//   res.status(200).json({});
// }
