<?php
/* Template Name: Department Directory Template */
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CASES_Portal
 */

 get_header(); ?>

 <?php if ( !is_user_logged_in()) {
 }
 else { ?>
  <div id="primary" class="content-area">
  <div id="department-directory">
    <h1>Department Directory</h1>
    <div class="dept-dir-container">
      <a href="#!" class="dept-header">
        <div class="dept-dir-circle">
      <i class="fa fa-plus-square" aria-hidden="true"></i>
    </div>
      <h2>Behavioral Health Services</h2>
    </a>
      <ul>
        <li><a href="#!">Adolescent Portable Therapy</a></li>
        <li><a href="#!">Brooklyn FACT</a></li>
        <li><a href="#!">Brooklyn Intensive Mobile Treatment (IMT)</a></li>
        <li><a href="#!">Manhattan ACT</a></li>
        <li><a href="#!">Manhattan FACT I</a></li>
        <li><a href="#!">Manhattan FACT II</a></li>
        <li><a href="#!">Nathaniel ACT</a></li>
        <li><a href="#!">Nathaniel Clinic</a></li>
      </ul>
    </div>
    <div class="dept-dir-container">
      <a href="#!" class="dept-header">
        <div class="dept-dir-circle">
        <i class="fa fa-gavel" aria-hidden="true"></i>
      </div>
      <h2>Court Services</h2>
    </a>
      <ul>
        <li><a href="#!">Court Employment Project (CEP)</a></li>
        <li><a href="#!">Court Operations</a></li>
        <li><a href="#!">Manhattan CIRT</a></li>
        <li><a href="#!">Manhattan Supervised Release (SRP)</a></li>
        <li><a href="#!">newSTART</a></li>
      </ul>
    </div>
    <div class="dept-dir-container">
      <a href="#!" class="dept-header">
        <div class="dept-dir-circle">
        <i class="fa fa-bullhorn" aria-hidden="true"></i>
      </div>
      <h2>Development & Communications</h2>
    </a>
    </div>
    <div class="dept-dir-container">
      <a href="#!" class="dept-header">
        <div class="dept-dir-circle">
        <i class="fa fa-book" aria-hidden="true"></i>
      </div>
      <h2>Education Career & Enrichment</h2>
    </a>
      <ul>
        <li><a href="#!">Bronx Choices</a></li>
        <li><a href="#!">Bronx PEAK</a></li>
        <li><a href="#!">Brooklyn Justice Corps</a></li>
        <li><a href="#!">Brooklyn PEAK</a></li>
        <li><a href="#!">Coney Island Training and Education (CITE)</a></li>
        <li><a href="#!">Harlem Plus</a></li>
        <li><a href="#!">Jobs for America's Graduates (JAG NY)</a></li>
        <li><a href="#!">Manhattan Choices</a></li>
        <li><a href="#!">Queens Justice Corps</a></li>
      </ul>
    </div>
  </div>
   	</div><!-- #primary -->
</span>

<?php
get_footer(); ?>
<?php } ?>
