---
layout: page
title: TensorFlow&trade; Patterns
link: /patterns/
description: A list of patterns for software development in TensorFlow.
---


<table id="patterns-table" class="table table-striped table-bordered" cellspacing="0" width="100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Scope</th>
      <th>Summary</th>
    </tr>
  </thead>
  <tbody>
    {% for page in site.pages %}
    {% assign prefix = page.path|slice:0,9 %}
    {% if prefix == 'patterns/' and page.name != 'index.md' %}
    <tr>
      <td><a href="{{page.url}}">{{page.title}}</a></td>
      <td>{{page.scope}}</td>
      <td>{{page.summary}}</td>
    </tr>
    {% endif %}
    {% endfor %}

  </tbody>
</table>

<div style="height:220px"></div>
