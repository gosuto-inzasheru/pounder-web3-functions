import { PALADIN_MERKLE_CLAIM_URL, AURA_STRATEGY } from "./constants";
import ky from "ky";

export default async function getPaladinProofs() {
  try {
    const url = `${PALADIN_MERKLE_CLAIM_URL}${AURA_STRATEGY}`;
    const response = await ky
      .get(url, { timeout: 5_000, retry: 0 })
      .json();

    const rewardsResponse = response["delegations"];

    return rewardsResponse;
  } catch (error) {
    throw `error in getPaladinProofs: ${error.message} `;
  }
}
