---
layout: page
title: TensorFlow&trade; Patterns
link: /patterns/
description: A list of patterns for software development in TensorFlow.
---

<div class="row">
  <div class="col-12 mb-3">
    <div class="d-flex align-items-center license">
      <div>
        <input id="patterns-filter" type="search" class="form-control" placeholder="Filter">
      </div>
      <div id="patterns-filter-status" class="pl-2 text-muted">
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-12">
    <table id="patterns-table" class="table table-bordered">
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
          <td class="pattern-list-name"><a href="{{page.url}}">{{page.title}}</a></td>
          <td class="pattern-list-scope"><a href="{{page.scope|slugify}}">{{page.scope}}</a></td>
          <td class="pattern-list-summary">{{page.summary}}</td>
        </tr>
        {% endif %}
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>
