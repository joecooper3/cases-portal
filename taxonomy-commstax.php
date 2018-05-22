<?php
get_header(); ?>
<?php if ( !is_user_logged_in()) {
 }
 else { ?>

	<div id="primary" class="content-area">
		<div>
			<header class="page-header">
				<?php
					the_archive_title( '<h1 class="page-title">', '</h1>' );
					the_archive_description( '<div class="archive-description">', '</div>' );
				?>
			</header><!-- .page-header -->
        <div id="comms-archive-container">
            <i class="fa fa-circle-o-notch spinning" aria-hidden="true"></i>
        </div>
		</div><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer(); ?>
<?php } ?> // eslint-disable-line