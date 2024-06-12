from invoke import task

@task
def start_development(ctx):
    ctx.run("FLASK_ENV='development' python3 -m src.app.index", pty=True)

@task
def start_production(ctx):
    ctx.run("FLASK_ENV='production' python3 -m  src.app.index", pty=True)

@task
def start_test_environment(ctx):
    ctx.run("FLASK_ENV='testing' python3 -m src.app.index", pty=True)

@task(start_test_environment)
def test(ctx):
    ctx.run('pytest')

@task
def coverage(ctx):
    ctx.run("coverage run --branch -m pytest", pty=True)

@task(coverage)
def coverage_report(ctx):
    ctx.run("coverage html", pty=True)
