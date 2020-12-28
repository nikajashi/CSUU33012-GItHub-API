from github import Github

# using username and password
g = Github("username", "password")

for repo in g.get_user().get_repos():
    branch = repo.get_branch("master")
    print("{0:75} Most Recent {1:80}".format(str(repo), str(branch.commit)))