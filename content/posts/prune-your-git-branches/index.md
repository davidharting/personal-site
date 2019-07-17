---
title: How to delete all but one local git branch
date: '2019-07-17T12:16:12.119Z'
tags: ['git']
---

Here is the command to delete all local branches _except_ for `master`.

```bash
git branch | grep -v "master" | xargs git branch -D
```

Now, let's break down what each of these does.

# 1. git branch

This prints all your local branches to standard out. Each branch goes on it's own line.

# 2. grep -v "master"

The `grep` tool finds regular expression matches. It can be used against a file, but in this case we are "piping" the output of `git branch` into `grep`, so it will find matches against that.

The `-v` option on `grep` is sort of like inversing the operation. Rather than selecting all the lines that match "master," we will match all the lines that do **not** match "master."

So in step 1, we got a list of branches. This step is essentially just filtering out the `master` branch from that list.

If you want to exclude more branches, just substitute `master` for a regular expression that would match all the branches you want to preserve.

# 3. xargs git branch -D

The simple part of this is `git branch -D` which deletes a local branch. You just put the name of the branch you want to delete on the end.

Now we have our filtered list of branches that we want to delete piped as input to `xargs`. The `xargs` tool will take each line going in and pass that line is as an argument to a command.

To break that down further, the _argument_ we are passing into `xargs` is itself a command (`git branch -D`).

The _input_ piped into `xargs` is a list of branches, which we want to become arguments for the `git branch -D` command.

`xargs` will essentially iterate through each line of standard input and invoke `git branch -D line-of-standard-input` for us.
