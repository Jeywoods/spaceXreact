// src/api/spacex.js
export class SpaceX {
  constructor(baseUrl = "https://api.spacexdata.com/v4/") {
    this.baseUrl = baseUrl;
  }

  async launches() {
    const res = await fetch(`${this.baseUrl}launches`);
    if (!res.ok) throw new Error("Failed to fetch launches");
    return res.json();
  }

  async launchpads() {
    const res = await fetch(`${this.baseUrl}launchpads`);
    if (!res.ok) throw new Error("Failed to fetch launchpads");
    return res.json();
  }

  async launchpad(id) {
    const res = await fetch(`${this.baseUrl}launchpads/${id}`);
    if (!res.ok) throw new Error("Failed to fetch launchpad " + id);
    return res.json();
  }
}
