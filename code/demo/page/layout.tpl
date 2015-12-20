{%html framework="common:static/mod.js"%}
  {%head%}
    <meta charset='utf-8'>
    <title>{%block name="title"%}fis odp 演示例子{%/block%}</title>
<!-- 
@require common:static/reset.css
-->
  {%/head%}

  {%body%}
   <div id="container">
      {%widget name="first:widget/header/header.tpl"%}
      <div class="main">
        {%block name="main"%}{%/block%}
      </div>
      {%widget name="first:widget/footer/footer.tpl"%}
    </div>
  {%/body%}

{%/html%}
