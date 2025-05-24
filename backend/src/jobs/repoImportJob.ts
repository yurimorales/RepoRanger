import { sendRepoImportJob } from "../queue/rabbitmq";
import { Repository } from "../models/repository";

export const importRepoJob = async (repoData: any) => {
  try {
    await sendRepoImportJob(repoData);
    console.log("Job sent to queue:", repoData);
  } catch (error) {
    console.error("Error sending job to queue:", error);
  }
};

export const processRepoImportJob = async (data: any) => {
  const repositories = Array.isArray(data) ? data : [data];

  for (const repo of repositories) {
    const { name, owner, stars } = repo;
    try {
      await Repository.create({
        name,
        owner,
        stars,
      });
      console.log("Repository saved:", name);
    } catch (error) {
      console.error("Error saving repository:", name, error);
    }
  }
};
