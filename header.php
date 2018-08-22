<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package CASES_Portal
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-42662515-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-42662515-4');
</script> -->

	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#2d89ef">
<meta name="theme-color" content="#ffffff">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php if ( !is_user_logged_in()) {
		echo "<div class='login-container'>";
		echo "<div class='login-head'>";
		echo "<img src='http://portal.cases.org/wp-content/themes/cases_portal/images/spiral-mid.png' />";
		echo "</div>";
		wp_login_form( array('echo' => true));
		echo "</div>";
	}
	else { ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'cases_portal' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="header-container">
		<div class="site-branding">
			<a href="<?php echo get_home_url(); ?>">
			<img src="<?php echo get_template_directory_uri(); ?>/images/spiral-mid.png" alt="CASES Portal Logo" />
		</a>
		</div><!-- .site-branding -->

		<div id="search-box">

			<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-search-6" viewBox="0 0 40 40">
    <path d="M28.295 32.517c-2.93 2.086-6.51 3.312-10.38 3.312C8.02 35.83 0 27.81 0 17.914 0 8.02 8.02 0 17.915 0 27.81 0 35.83 8.02 35.83 17.915c0 3.87-1.227 7.45-3.313 10.38l6.61 6.61c1.166 1.165 1.163 3.057 0 4.22-1.167 1.167-3.057 1.167-4.226-.002l-6.605-6.606zm-10.38.326c8.245 0 14.928-6.683 14.928-14.928 0-8.245-6.683-14.93-14.928-14.93-8.245 0-14.93 6.685-14.93 14.93 0 8.245 6.685 14.928 14.93 14.928zm0-26.573c-6.43 0-11.645 5.214-11.645 11.645 0 .494.4.895.896.895.495 0 .896-.4.896-.895 0-5.442 4.41-9.853 9.853-9.853.494 0 .895-.4.895-.896 0-.495-.4-.896-.895-.896z"
    fill-rule="evenodd" />
  </symbol>
  <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-clear-4" viewBox="0 0 20 20">
    <path d="M11.664 9.877l4.485 4.485-1.542 1.54-4.485-4.485-4.485 4.485-1.54-1.54 4.485-4.485-4.485-4.485 1.54-1.54 4.485 4.484 4.485-4.485 1.54 1.542-4.484 4.485zM10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10z" fill-rule="evenodd"
    />
  </symbol>
</svg>

<form id="particular-search" novalidate="novalidate" onsubmit="return false;" class="searchbox sbx-custom">
  <div role="search" class="sbx-custom__wrapper">
    <input type="search" name="search" placeholder="Search the CASES directory" autocomplete="off" required="required" class="sbx-custom__input">
    <button type="submit" title="Submit your search query." class="sbx-custom__submit">
      <svg role="img" aria-label="Search">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-search-6"></use>
      </svg>
    </button>
    <button type="reset" title="Clear the search query." class="sbx-custom__reset">
      <svg role="img" aria-label="Reset">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-clear-4"></use>
      </svg>
    </button>
  </div>
</form>
<script type="text/javascript">
  document.querySelector('.searchbox [type="reset"]').addEventListener('click', function() {  this.parentNode.querySelector('input').focus();});
</script>
		</div>
	</div>

		<nav id="site-navigation" class="main-navigation">
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'cases_portal' ); ?></button>
			<?php
				wp_nav_menu( array(
					'theme_location' => 'menu-1',
					'menu_id'        => 'primary-menu',
				) );
			?>
		</nav><!-- #site-navigation -->

	</header><!-- #masthead -->
	<div id="content" class="site-content">
		<?php } ?>
