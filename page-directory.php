<?php /* Template Name: Staff Directory Template */
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

   <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol xmlns="http://www.w3.org/2000/svg" id="sbx2-icon-search-6" viewBox="0 0 40 40">
  <path d="M28.295 32.517c-2.93 2.086-6.51 3.312-10.38 3.312C8.02 35.83 0 27.81 0 17.914 0 8.02 8.02 0 17.915 0 27.81 0 35.83 8.02 35.83 17.915c0 3.87-1.227 7.45-3.313 10.38l6.61 6.61c1.166 1.165 1.163 3.057 0 4.22-1.167 1.167-3.057 1.167-4.226-.002l-6.605-6.606zm-10.38.326c8.245 0 14.928-6.683 14.928-14.928 0-8.245-6.683-14.93-14.928-14.93-8.245 0-14.93 6.685-14.93 14.93 0 8.245 6.685 14.928 14.93 14.928zm0-26.573c-6.43 0-11.645 5.214-11.645 11.645 0 .494.4.895.896.895.495 0 .896-.4.896-.895 0-5.442 4.41-9.853 9.853-9.853.494 0 .895-.4.895-.896 0-.495-.4-.896-.895-.896z"
  fill-rule="evenodd" />
  </symbol>
  <symbol xmlns="http://www.w3.org/2000/svg" id="sbx2-icon-clear-4" viewBox="0 0 20 20">
  <path d="M11.664 9.877l4.485 4.485-1.542 1.54-4.485-4.485-4.485 4.485-1.54-1.54 4.485-4.485-4.485-4.485 1.54-1.54 4.485 4.484 4.485-4.485 1.54 1.542-4.484 4.485zM10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10z" fill-rule="evenodd"
  />
  </symbol>
  </svg>
 	<div id="primary" class="content-area">
    <span id="directory-totality">
 			<div class="no-bg">
 		<h1 id="dept-title" data-id="<?php the_title();?>"><?php the_title();?></h1>
    <div class="entry-content">
      <div id="search-box">
  <form id="inside-search" novalidate="novalidate" onsubmit="return false;" class="searchbox sbx2-custom">
    <div role="search" class="sbx2-custom__wrapper">
      <input type="search" name="search" placeholder="Search the CASES directory" autocomplete="off" required="required" class="sbx2-custom__input">
      <button type="submit" title="Submit your search query." class="sbx2-custom__submit">
        <svg role="img" aria-label="Search">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx2-icon-search-6"></use>
        </svg>
      </button>
      <button type="reset" title="Clear the search query." class="sbx2-custom__reset">
        <svg role="img" aria-label="Reset">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx2-icon-clear-4"></use>
        </svg>
      </button>
    </div>
  </form>
  <script type="text/javascript">
    document.querySelector('.searchbox [type="reset"]').addEventListener('click', function() {  this.parentNode.querySelector('input').focus();});
  </script>
      </div>
  	</div>
 	</div>
  <div id="directory-search-results">Dun dun dun
  </div>
</span>
 	</div><!-- #primary -->
 <?php
 get_footer();
