export function matchJobRoles(userSkills, jobRolesArray) {
  const matched = [];

  jobRolesArray.forEach(({ role, skills }) => {
    const lowerSkills = skills.map((s) => s.toLowerCase());
    const matchCount = lowerSkills.filter((skill) =>
      userSkills.includes(skill)
    ).length;

    if (matchCount > 0) {
      matched.push({ role, matchCount, total: skills.length });
    }
  });

  return matched.sort((a, b) => b.matchCount - a.matchCount);
}