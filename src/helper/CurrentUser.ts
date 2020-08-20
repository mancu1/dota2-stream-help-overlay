export function getUser(
  gamestate: any
): { user: boolean; team: string; player: string } {
  let user = null;
  let radiantCount = 0;
  for (const el of Object.values(gamestate.hero.team2)) {
    if ((el as any).selected_unit) {
      user = { user: true, team: "team2", player: `player${radiantCount}` };
      break;
    }
    radiantCount++;
  }
  let direCount = 0;
  if (!user) {
    for (const el of Object.values(gamestate.hero.team3)) {
      if ((el as any).selected_unit) {
        user = { user: true, team: "team3", player: `player${5 + direCount}` };
        break;
      }
      direCount++;
    }
  }
  return user || { user: false, team: "", player: "" };
}

export function spellCount(gamestate: any) {
  const user = getUser(gamestate);

  if (user.user) {
    return Object.values(gamestate.abilities[user.team][user.player]).reduce(
      (count: number, el: any) => {
        if (!el.name.includes("seasonal")) count++;
        return count;
      },
      0
    );
  } else return 0;
}

export function spellSize(spellCount: number) {
  if (spellCount <= 4) {
    return 56.8;
  } else if (spellCount === 5) {
    return 57.6;
  } else {
    return 59.2;
  }
}
