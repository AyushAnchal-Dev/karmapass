export const fetchGitHubStats = async (username) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("GitHub user not found");
    const data = await res.json();

    const repos = await fetch(data.repos_url);
    const reposData = await repos.json();

    const langs = {};
    reposData.forEach(repo => {
      if (repo.language) langs[repo.language] = (langs[repo.language] || 0) + 1;
    });

    return {
      avatar: data.avatar_url,
      name: data.name || data.login,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      languages: Object.entries(langs)
        .sort((a, b) => b[1] - a[1])
        .map(([lang]) => lang)
        .slice(0, 3),
    };
  } catch (err) {
    console.error("GitHub API Error:", err.message);
    return null;
  }
};