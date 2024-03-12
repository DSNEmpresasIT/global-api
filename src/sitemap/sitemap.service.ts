import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { GetSiteMapDto, QueryParamsGetSitemap } from './dto/sitemap.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SitemapService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UserService,
  ) {}
  async getSitemap(clientId: number, querys: QueryParamsGetSitemap, body: GetSiteMapDto) {
    try {
      await this.usersService.getUserData(clientId);
      const date = new Date();
      let projects;

      if (querys.projects) {
        projects = await this.projectsService.getAllCompanyProjects(clientId)
      }

      const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${body.pageUrl}/</loc>
          <lastmod>${date}</lastmod>
          <priority>0.8</priority>
        </url>
        ${body.staticPaths.map(( path )=> {
            return `
        <url>
          <loc>${body.pageUrl}/${path}</loc>
          <lastmod>${date}</lastmod>
          <priority>0.76</priority>
        </url>
        `
          }).join('')
        }
        ${projects.projects
          .map(({ _id }) => {
            return `
        <url>
          <loc>${`${body.pageUrl}/${body.dynamicPaths.projects }?project=${_id}`}</loc>
          <lastmod>${date}</lastmod>
          <priority>0.64</priority>
        </url>
        `;
          })
          .join('')}
      </urlset>
      `

      return {
        sitemap
      }
    } catch (error) {
      throw new BadGatewayException('Error in getSitemap: ', error.message)
    }
  }
}
