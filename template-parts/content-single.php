<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CASES_Portal
 */

?>


<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title('<h1 class="entry-title">', '</h1>'); ?>
		<div class="entry-meta">
			<?php cases_portal_posted_on();
			$cat = get_the_category();
			$catName = $cat[0]->name;
			$catIcon = get_field('icon', $cat[0]);
			$catColor = get_field('color', $cat[0]);
			$catUrl = get_field('parent_page', $cat[0]);
			?>
			<?php if ($catName !== "Uncategorized") : ?>
			<a href="<?php echo $catUrl; ?>">
				<span class="category" style="background-color: <?php echo $catColor; ?>">
					<i class="fa <?php echo $catIcon; ?>" aria-hidden="true"></i><?php echo $catName; ?>
				</span>
			</a>
		<?php endif; ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php
            the_content(sprintf(
                wp_kses(
                    /* translators: %s: Name of current post. Only visible to screen readers */
                    __('Continue reading<span class="screen-reader-text"> "%s"</span>', 'cases_portal'),
                    array(
                        'span' => array(
                            'class' => array(),
                        ),
                    )
                ),
                get_the_title()
            )); ?>
	</div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->
</div>
