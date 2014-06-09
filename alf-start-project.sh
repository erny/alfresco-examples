#!/bin/bash
mvn archetype:generate \
    -DarchetypeCatalog=https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml \
    -Dfilter=org.alfresco.maven.archetype:
