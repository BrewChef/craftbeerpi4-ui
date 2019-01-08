from setuptools import setup, find_packages

setup(name='cbpi-ui',
      version='4.0.0-dev-1',
      description='CraftBeerPi User Interface',
      author='Manuel Fritsch',
      author_email='manuel@craftbeerpi.com',
      url='http://web.craftbeerpi.com',
      include_package_data=True,
      package_data={
        # If any package contains *.txt or *.rst files, include them:
      '': ['*.txt', '*.rst', '*.yaml'],
      'cbpi-ui': ['*','*.txt', '*.rst', '*.yaml']},
      packages=['cbpi-ui'],
     )



